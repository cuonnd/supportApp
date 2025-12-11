import React from 'react';

export interface GeneratedImage {
  url: string;
  prompt: string;
  id: string;
  timestamp: number;
}

export enum AppMode {
  LANDING = 'LANDING',
  GENERATOR = 'GENERATOR',
  EDITOR = 'EDITOR',
  THREED = 'THREED',
  SUPPORT = 'SUPPORT',
}

export interface NavItem {
  label: string;
  mode: AppMode;
  icon?: React.ReactNode;
}