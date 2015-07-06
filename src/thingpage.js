export class ThingPage
{
  constructor(router)
  {
    this.things = [
      {id: 1, value: 'one'},
      {id: 2, value: 'two'},
      {id: 3, value: 'three'}
    ];

    setInterval(this.updateThings.bind(this), 1000);
  }

  updateThings()
  {
    // fake incoming data
    var thing = {};
    thing.id = Math.floor(Math.random() * 10);
    thing.value = 'generated-' + thing.id;

    var self = this;
    var updated = this.things.some(function(t, idx) {
      if (t.id === thing.id) {
        self.things[idx] = thing;
        return true;
      }

      return false;
    });

    if (!updated) {
      this.things.push(thing);
    }
  }
}
