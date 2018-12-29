import React from 'react';
import RX from 'reactxp';
import { DEBUG, DEV } from './config';
import {MainView} from './views/MainView';

RX.App.initialize(DEBUG, DEV);
RX.UserInterface.setMainView(<MainView />);
