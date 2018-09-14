import { Application } from 'probot';
import { Container } from 'typedi';
import { GithubEvents } from '@data/mappers/github-events';
import { DeveloperInput, Track } from '@domain/entities';
import { NextStepUseCase } from '@domain/usecases';
import { GithubEventSender } from '@presentation/github-interaction';
import { PayloadMapper } from '@presentation/mappers';

const eventsSender: GithubEventSender = Container.get(GithubEventSender);
const useCase: NextStepUseCase = Container.get(NextStepUseCase);

export const robot = (app: Application) => {

  app.on(GithubEvents.Installation.Created, async context => {
    const dev: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
    const track: Track = await useCase.execute(dev);

    eventsSender.openEvent(context, track);
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    if (context.isBot) {
      return;
    }

    const comment = context.payload.comment;
    const isFinishComment: boolean = comment && comment.body.match(/finish|next*/i);

    if (isFinishComment) {
      const dev: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
      const track: Track = await useCase.execute(dev);

      eventsSender.openEvent(context, track);
    }
  });

  app.on(GithubEvents.Clone, async context => {
    const isRightClone = true

    if (isRightClone) {
      const dev: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
      const track: Track = await useCase.execute(dev);

      eventsSender.openEvent(context, track);
    }
  });
};
