class Match {
  constructor(matchInfo) {
    this.fullRoundText = matchInfo.fullRoundText;
    this.phase = matchInfo.phase;
    this.pool = matchInfo.pool;
    this.opponentId = matchInfo.opponentId;
    this.displayScore = matchInfo.displayScore;
    this.id = matchInfo.id;
  }
}

export default Match;
