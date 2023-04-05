export type Artifact = {
  hash: string
  /**
   * Size in bytes
   */
  size: number
  createdAt: string | null
  hitTimes: number
}
