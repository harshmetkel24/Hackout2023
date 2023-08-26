var { User, hospital } = require('../model/model');
const jwt = require('jsonwebtoken');

exports.hostpitalAllocation = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }

    try {
        let rCount = req.body.rCount;
        let gCount = req.body.gCount;
        let yCount = req.body.yCount;

        const log = req.body.log;
        const lat = req.body.lat;

        const hospitals = await hospital.find();

        console.log(req.body);

        const profile = "driving";

        for (let i = 30; rCount || yCount || gCount; i += 15) {
            // console.log(rCount, yCount, gCount);
            let x = [];
            for (let ind = 0; ind < hospitals.length; ind++) {
                if (hospitals[ind].capacity - hospitals[ind].count.patient < 1) {
                    continue;
                }
                const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${hospitals[ind].coordinate.longitude},${hospitals[ind].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
                await fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const { duration } = data.routes[0];
                        if (duration / 60 <= i) {
                            x.push({ dur: duration/60, ind: ind });
                        }
                    })
                    .catch((error) => console.error("Error:", error));
            }
            x.sort((a, b) => {
                return a.dur - b.dur;
            });
            for (let j = 0; j < x.length && rCount; j++) {
                console.log("r : ",hospitals[x[j].ind]._id, x[j].dur);
                if (rCount > hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient) {
                    rCount -= (hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - rCount);
                    rCount = 0;

                }
                console.log(hospitals[x[j].ind].count.patient,"\n");

            }

            for (let j = 0; j < x.length && !rCount && yCount; j++) {
                console.log("y",hospitals[x[j].ind]._id, x[j].dur);
                
                if (yCount > hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient) {
                    yCount -= (hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - yCount);
                    yCount = 0;
                }

                console.log(hospitals[x[j].ind].count.patient,"\n");
            }

            for (let j = 0; j < x.length && !rCount && !yCount && gCount; j++) {
                console.log("z",hospitals[x[j].ind]._id, x[j].dur);

                if (gCount > hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient) {
                    gCount -= (hospitals[x[j].ind].capacity - hospitals[x[j].ind].count.patient);
                    hospitals[x[j].ind].count.patient = hospitals[x[j].ind].capacity;
                }
                else {
                    hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - gCount);
                    gCount = 0;
                }
                console.log(hospitals[x[j].ind].count.patient,"\n");

            }

            // for (let j = 0; j < x.length; j++) {
            //     User.findByIdAndUpdate(hospitals[x[i].ind]._id, hospitals[x[i].ind], { useFindAndModify: false })
            //         .then(data => {
            //             if (!data) {
            //                 res.status(404).send({ message: `Cannot Update hosputal with id` });
            //             }
            //         })
            //         .catch(err => {
            //             res.status(500).send({ message: "Error Update user information" });
            //         })
            // }

        }

        res.status(200).json({ message: hospitals });


    } catch (err) {
        res.status(500).send(err);
    }
}