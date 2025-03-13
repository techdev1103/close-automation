declare module 'close.io' {
  export default class Closeio {
    constructor(apiKey: string);
    lead: {
      create(data: { name: string }): Promise<{ id: string }>;
      read(id: string): Promise<any>;
    };
  }
}
