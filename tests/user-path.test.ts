import 'reflect-metadata';
import { Container } from 'typedi';
import { redisClient } from '@data/db/redis-client';
import { Events } from '@presentation/events';
import { Event, EventType } from '@presentation/models';

describe('Finish comment event', () => {
  const events: Events = Container.get(Events);
  const testUser = '6992731';
  const simulatedContext = { payload: require('./webhook-simulations/comment-finish.payload.json') };

  function assertIssueEvent(event: Event, expectedTitleFragment: string) {
    expect(event.type).toEqual(EventType.CreateIssue);
    expect(event.issue.title).toContain(expectedTitleFragment);
    expect(event.issue.body).toBeTruthy();
  }

  function assertCommentEvent(event: Event, keyExpression: string) {
    expect(event.type).toEqual(EventType.CreateComment);
    expect(event.issue).toBeUndefined();
    expect(event.body).toContain(keyExpression);
  }

  beforeAll(async () => {
    await redisClient.del(testUser);
  });

  afterAll(async () => {
    redisClient.quit();
  });

  describe('Track 0', async () => {
    it('should iniate repo with track 0 and step 1', async () => {
      // TODO: change to fork webhook instead of "Finish" comment
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 0]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Clone this repository');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Update README.md');
    });
  });

  describe('Track 1', async () => {
    it('should open Track 1 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 1]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Create a new Branch');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Set default branch');
    });
  });

  describe('Track 2', async () => {
    it('should open Track 2 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 2]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Create a simple Hello World');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Create a Pull Request');
    });
  });

  describe('Track 3', async () => {
    it('should open Track 3 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 3]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Pull Request');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Challenge: Loading');
    });
  });

  describe('Track 4', async () => {
    it('should open Track 2 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 4]');
    });

    it('should go to step 4', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Integrate the app with the server');
    });
  });

  describe('Track 5', async () => {
    it('should open Track 5 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 5]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Challenge: Add pagination to the list');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Bonus: Thinking outside the box');
    });
  });

  describe('Track 6', async () => {
    it('should open Track 6 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 6]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Authenticate web requests');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Challenge!!!');
    });
  });

  describe('Track 7', async () => {
    it('should open Track 7 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 7]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Integration');
    });

    it('should go to step 3', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 3 - Challenge!!!');
    });
  });

  describe('Track 8', async () => {
    it('should open Track 8 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 8]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Extra Step - Flash messages');
    });
  });

  describe('Track 9', async () => {
    it('should open Track 9 issue with step 1', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertIssueEvent(event, '[Track 9]');
    });

    it('should go to step 2', async () => {
      const event = await events.onCommentCreated(simulatedContext);
      assertCommentEvent(event, 'Step 2 - Challenge: edit a user');
    });
  });
});
