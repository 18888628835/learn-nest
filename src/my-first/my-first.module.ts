import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class MyFirstModule {
  static register(options: Record<string, any>): DynamicModule {
    const optionProvider = {
      provide: 'CONFIG_OPTIONS',
      useValue: options,
    };
    return {
      module: MyFirstModule,
      providers: [optionProvider],
      exports: [optionProvider],
    };
  }
}
