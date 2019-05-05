(req,res)=>{
	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data=>
	{
		const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
		if(isValid){
			console.log(isValid);
			return db.select('*').from('users')
			.where('email','=', req.body.email)
			.then(resp=>{
			console.log(resp);
			res.json(resp[0])
			})
			.catch(err=>res.status(400).json('unable to access'));
		}else{
			console.log('error logging in');
			res.status(400).json('wrong credentials');
		}
	}).catch(err=>res.status(400).json('wrong credentials'));
	
}