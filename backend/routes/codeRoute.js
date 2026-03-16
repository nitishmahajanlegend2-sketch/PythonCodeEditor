const express=require('express');
const {getfileCode,saveCode,getallfilenames,deleteCode,generateCode}=require('../controllers/codeController');
const router=express.Router();
router.post('/getfilecode',getfileCode);
router.post('/savecode',saveCode);
//router.post('/editcode',editCode);
router.post('/getallfilenames',getallfilenames);
router.post('/deletefile',deleteCode)
router.post('/generatecode',generateCode)
//router.post('/updateandrun',updateandrun)
module.exports=router;

