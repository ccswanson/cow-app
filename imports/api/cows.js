import { Mongo } from 'meteor/mongo';

export const Cows = new Mongo.Collection('cows');

export const Calves = new Mongo.Collection('calves');
