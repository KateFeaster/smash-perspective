class Player {
  constructor(id, gamerTag, prefix, profileImage) {
    this.id = id;
    this.gamerTag = gamerTag;
    this.prefix = prefix;
    this.profileImage = profileImage;

    this.matches = [];
  }
}

export default Player;
