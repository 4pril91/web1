const express = require("express")
const Boards = require("../schemas/board")
const router = express.Router()

router.post('/board', async (req, res) => {

    const {title, writer, passwd, content, date} = req.body;

    //seq 순서 
    //find == Select
    //sort == order By
    //limit == limit 1 1개로 제한
    // 
    //1번 게시글을 써야돼

    let boardId = await Boards.find({}).sort("-boardId").limit(1);
    if (boardId.length == 0) { boardId = 1 } // 검색결과가 없으면 boardId를 1로 설정
    else { boardId = boardId[0]['boardId'] + 1; } //검색결과가 있으면 결과의 boardId + 1 로 설정

    await Boards.create({ boardId, title, writer, passwd, content, date })

    res.send({ result: "success" })
})

router.get('/board', async(req, res)=> {
    try{
        const boards = await Boards.find({}).sort("-date");
        res.json({boards: boards})

    }catch (err){

        next(err);
    }
})

router.get('/board/:boardId', async(req, res)=>{
    const {boardId} = req.params;
    board = await Boards.findOne({boardId: boardId});

    res.json({detail: board})
})

router.post("/board/:boardId", async(req, res)=>{
    try{
        const {boardId} = req.params;
        const {writer, passwd, title, content} = req.body;
        
        const checkPasswd = await Boards.find({boardId, passwd});
        console.log(checkPasswd.length)
        if(checkPasswd.length !== 0){
            await Boards.updateOne({boardId}, {$set: {writer, title, content}})
            res.send({result: "수정되었습니다."})
        }
        else{
            res.send({result:"비밀번호가 틀립니다."})
        }
        
    }catch(err){
        
    }

})

router.post("/board/:boardId/delete", async(req, res)=> {
    try{
        const {boardId} = req.params
        const {passwd} = req.body
        console.log(boardId)
        
        const checkPasswd = await Boards.find({boardId, passwd});
        if(checkPasswd.length !== 0){
            await Boards.deleteOne({boardId})
            res.send({result: "삭제되었습니다."})
        }
        else{
            res.send({result : "비밀번호가 틀립니다"})
        }
        
        

    }catch(err){

    }
})



module.exports = router;