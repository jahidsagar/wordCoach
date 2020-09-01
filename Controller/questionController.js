const q = [
    {
        id:1,
        level:'easy',
        word:"find synonym of the word 'good'",
        option_a:'fine',
        option_a_des:'fine means something',
        option_b:'well',
        option_b_des:'well means another',
        ans:'option_a'

    },
    {
        id:2,
        level:'inter',
        word:"find synonym of the word 'good'",
        option_a:'fine',
        option_a_des:'fine means something',
        option_b:'well',
        option_b_des:'well means another',
        ans:'option_a'

    },
    {
        id:3,
        level:'advance',
        word:"find synonym of the word 'good'",
        option_a:'fine',
        option_a_des:'fine means something',
        option_b:'well',
        option_b_des:'well means another',
        ans:'option_a'

    }
];

exports.get_all_question = (req,res)=>{
    const token = req.params.jwt;
    if(token){
        //do something
        res.json(q);
    }
    res.send('sorry bro');
}