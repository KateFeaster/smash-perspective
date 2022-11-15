class Player {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.gamerTag = userInfo.gamerTag;
    this.prefix = userInfo.prefix;
    this.profileImage = userInfo.profileImage;
    this.seed = userInfo.seed;
    this.placement = userInfo.placement;

    this.matches = [];
  }
}

export default Player;
