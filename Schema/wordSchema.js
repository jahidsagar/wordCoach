//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var QuestionModelSchema = new Schema({
  question:{ type: String , required:true},
  option_a: { type: String , required:true},
  op_a_desc: { type: String , required:true}, 
  option_b: { type: String , required:true},
  op_b_desc: { type: String , required:true},
  level: { type: String , required:true},
  ans: { type: String , required:true}
},{timestamps: true}
);
let QuestionModel = mongoose.model('Question', QuestionModelSchema);
module.exports = QuestionModel;