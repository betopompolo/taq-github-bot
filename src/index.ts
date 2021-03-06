import 'module-alias/register';
import 'reflect-metadata';
import Container from 'typedi';
import { Robot } from './robot';
import { configureRobot } from './robot.configure';

configureRobot();
const robot = Container.get(Robot);

export = robot.webhookReceiver;
