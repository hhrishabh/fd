const handleSignin=(req,res,db,bcrypt)=>{
	const {email,password}=req.body;
	if(!email||!password){
		return res.status(400).json('incorrect form submission');
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data=>
	{
		const isValid=bcrypt.compareSync(password,data[0].hash);
		if(isValid){
			console.log(isValid);
			return db.select('*').from('users')
			.where('email','=', email)
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
module.exports={
handleSignin: handleSignin
}; 