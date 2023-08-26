var { lab } = require('../model/model');

exports.labsAllocation = async (req, res) => {
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

        const labs = await lab.find();

        const profile = "driving";

        let ans = new Map();

        for (let i = 30; rCount || yCount || gCount; i += 15) {
            // console.log(rCount, yCount, gCount);
            let x = [];
            for (let ind = 0; ind < hospitals.length; ind++) {
                const total = labs[ind].cntSample.red + labs[ind].cntSample.yellow + labs[ind].cntSample.green;
                if (labs[ind].capacity - total < 1) {
                    continue;
                }
                const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${log},${lat};${hospitals[ind].coordinate.longitude},${hospitals[ind].coordinate.latitude}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
                await fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const { duration } = data.routes[0];
                        if (duration / 60 <= i) {
                            x.push({ dur: duration / 60, ind: ind });
                        }
                    })
                    .catch((error) => console.error("Error:", error));
            }
            x.sort((a, b) => {
                return a.dur - b.dur;
            });
            for (let j = 0; j < x.length && rCount; j++) {
                const total = labs[x[j].ind].cntSample.red + labs[x[j].ind].cntSample.yellow + labs[x[j].ind].cntSample.green;
                const dif = Number(labs[x[j].ind].capacity - total);
                let tm = 0;
                if (rCount > dif) {
                    rCount -= dif;
                    tm = dif;
                    labs[x[j].ind].cntSample.red += dif;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - rCount);
                    labs[x[j].ind].cntSample.red += Number(rCount);
                    tm = Number(rCount);
                    rCount = 0;
                }
                if (ans.get(labs[x[j].ind])) {
                    tm += ans.get(labs[x[j].ind]);
                }
                ans.set(labs[x[j].ind], tm);
            }

            for (let j = 0; j < x.length && !rCount && yCount; j++) {
                const total = labs[x[j].ind].cntSample.red + labs[x[j].ind].cntSample.yellow + labs[x[j].ind].cntSample.green;
                const dif = Number(labs[x[j].ind].capacity - total);
                let tm = 0;
                if (yCount > dif) {
                    yCount -= dif;
                    tm = dif;
                    labs[x[j].ind].cntSample.yellow += dif;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - yCount);\
                    labs[x[j].ind].cntSample.yellow += Number(yCount);
                    tm = Number(yCount);
                    yCount = 0;
                }
                if (ans.get(labs[x[j].ind])) {
                    tm += ans.get(labs[x[j].ind]);
                }
                ans.set(labs[x[j].ind], tm);
            }

            for (let j = 0; j < x.length && !rCount && !yCount && gCount; j++) {
                const total = labs[x[j].ind].cntSample.red + labs[x[j].ind].cntSample.yellow + labs[x[j].ind].cntSample.green;
                const dif = Number(labs[x[j].ind].capacity - total);
                let tm = 0;
                if (gCount > dif) {
                    gCount -= dif;
                    tm = dif;
                    labs[x[j].ind].cntSample.green += dif;
                }
                else {
                    // hospitals[x[j].ind].count.patient += ( hospitals[x[j].ind].capacity - gCount);
                    labs[x[j].ind].cntSample.green += Number(gCount);
                    tm = Number(gCount);
                    gCount = 0;
                }
                if (ans.get(labs[x[j].ind])) {
                    tm += ans.get(labs[x[j].ind]);
                }
                ans.set(labs[x[j].ind], tm);
            }

            // for (let j = 0; j < x.length; j++) {
            //     await User.findByIdAndUpdate(hospitals[x[i].ind]._id, hospitals[x[i].ind], { useFindAndModify: false })
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

        await res.status(200).json(Object.fromEntries(ans));


    } catch (err) {
        res.status(500).send(err);
    }
}