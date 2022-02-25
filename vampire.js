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
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let vampire = this;

    while (vampire.creator) {
      num++;
      vampire = vampire.creator;
    }

    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  ancestors() {
    const result = [this.name];
    let temp = this;

    while (temp.creator) {
      temp = temp.creator;
      result.push(temp.name);
    }
    
    return result;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let arr1 = this.ancestors();
    let arr2 = vampire.ancestors();

    if (arr1.length < arr2.length) {
      let temp = arr1;
      arr1 = arr2;
      arr2 = temp;
    }

    for (let vamp1 of arr1) {
      for (let vamp2 of arr2) {
        if (vamp1 == vamp2) {
          return vamp1;
        }
      }
    }
  }
}

module.exports = Vampire;

