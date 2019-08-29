module.exports = {
  async completed() {
  this.npmClient = 'npm'
    this.gitInit()
    await this.npmInstall()
  }
}
