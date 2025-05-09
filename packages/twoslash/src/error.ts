export class CodelexTwoslashError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CodelexTwoslashError'
  }
}
