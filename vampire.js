class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {

    this.offspring.push(vampire);

    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
   let numberOfVamp = 0;
   let currentVamp = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
   while (currentVamp.creator) {
    currentVamp = currentVamp.creator;
    numberOfVamp++;
   }

   return numberOfVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

      if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
        return false;
      } else {
        return true;
      }

  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (name === this.name){
       return this;
    }

    for (const vamp of this.offspring) {
     let search = vamp.vampireWithName(name);

     if(search){
       return search;
     }
    }

    return null;
  }


  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVamps = 0

    for (const vamp of this.offspring){
      totalVamps += vamp.totalDescendents + 1;
     }

    return totalVamps

  }


  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980){
      millennials.push(this);
    }

    for (const vamp of this.offspring){
      const millennialVamp = vamp.allMillennialVampires;
      millennials = millennials.concat(millennialVamp);
    }

    return millennials

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

