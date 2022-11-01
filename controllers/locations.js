const Location = require('../models/Location');

exports.getCreateLocation = (req, res) => {
	if (req.user.position === 'admin') {
		res.render('createnewlocation.ejs');
	} else redirect('/profile');
};
exports.postCreateLocation = async (req, res) => {
	const existingLocationName = await Location.find({
		locationName: req.body.locationName,
	});
	const existingLocationNumber = await Location.find({
		locationNumber: req.body.locationNumber,
	});
	if (existingLocationName.length > 0 || existingLocationNumber.length > 0) {
		res.render('createnewlocation.ejs', { existingLocation: true });
	} else {
		try {
			await Location.create({
				locationName: req.body.locationName,
				locationNumber: req.body.locationNumber,
			});
			console.log('New Location has been created');
			res.redirect('/profile');
		} catch (err) {
			console.log(err);
		}
	}
};
exports.getEditLocation = async (req, res) => {
	try {
		const location = null;
		const locations = await Location.find().lean();
		res.render('editlocation.ejs', {
			locations: locations,
			location: location,
		});
	} catch (err) {
		console.log(err);
	}
};
exports.getLocation = async (req, res) => {
	try {
		const locations = await Location.find().lean();
		const location = await Location.findOne({
			locationName: req.query.location,
		}).lean();
		res.render(`editlocation.ejs`, {
			location: location,
			locations: locations,
		});
	} catch (err) {
		console.log(err);
	}
};
exports.editLocation = async (req, res) => {
	try {
		await Location.findOneAndUpdate(
			{ _id: req.params.id },
			{
				locationName: req.body.locationname,
				locationNumber: req.body.locationnumber,
			}
		);
		res.redirect(`/editLocation`);
	} catch (err) {
		console.log(err);
	}
};
