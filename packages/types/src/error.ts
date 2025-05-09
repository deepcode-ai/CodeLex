export class CodelexError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CodelexError'
  }
}
