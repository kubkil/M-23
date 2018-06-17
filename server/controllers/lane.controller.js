import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

// export function getSomething(req, res) {
//   return res.status(200).end();
// }

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
// _id vs id, id vs laneId
  Note.deleteMany({ id: req.params.laneId }, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });

  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}
