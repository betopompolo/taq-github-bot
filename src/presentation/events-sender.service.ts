import { Context } from 'probot';
import { Service } from 'typedi';
import { Developer, DeveloperProgress, GetTracksUseCase, IncrementProgressUseCase, Track } from '@domain';
import { RobotStrings } from './robot.strings';

@Service()
export class GithubEventSender {
  constructor(
    private readonly getTracksUseCase: GetTracksUseCase,
    private readonly nextProgressUseCase: IncrementProgressUseCase,
  ) {}

  async openEvent(context: Context, developer: Developer) {
    const tracks = await this.getTracksUseCase.exec();
    const progress: DeveloperProgress = developer.progress;
    let trackToSend: Track;

    const isNewUser: boolean = !progress;
    if (isNewUser) {
      context.log(`Creating first track for ${developer.name}...`);
      trackToSend = tracks[0];
      await this.createFirstIssue(context, trackToSend.title, trackToSend.steps[0].body);
      return;
    }

    const finished: boolean = progress.completed === 1;
    if (finished) {
      context.log(`Congratulating ${developer.name} for finishing tutorial...`);
      await this.createComment(context, RobotStrings.FinishOnboard);
      return;
    }

    const nextProgress: DeveloperProgress = await this.nextProgressUseCase.execute(progress);

    const isNewTrack = nextProgress.step === 0;
    if (isNewTrack) {
      context.log(`Creating new track for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      const createdIssue = await this.createIssue(context, trackToSend.title, trackToSend.steps[0].body);
      this.createComment(context, RobotStrings.NextTrack(createdIssue.data.html_url));
      return;
    }

    const isNewStep = nextProgress.step > 0;
    if (isNewStep) {
      context.log(`Incrementing step for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      this.createComment(context, trackToSend.steps[nextProgress.step].body);
    }
  }

  private createIssue(context: Context, title: string, body: string) {
    const params = context.issue(Object.assign(context.event, { title: title || 'Issue', body }));

    return context.github.issues.create(params);
  }

  private createComment(context: Context, body: string) {
    const params = context.issue(Object.assign(context.event, { body }));

    context.github.issues.createComment(params);
  }

  private createFirstIssue(context: Context, title: string, body: string) {
    const fullNameSplit = context.payload.repositories[0].full_name.split('/');
    const params = { owner: fullNameSplit[0], repo: fullNameSplit[1], title, body };

    return context.github.issues.create(params);
  }
}
