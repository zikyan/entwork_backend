import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// Conversation Controller

export const postConversation = async (req,res) => {
   var check = false
    const allCon = await Conversation.find()
    allCon?.map((mem)=>{
        if(mem?.members[1].includes(req.body.receiverId)){
            check=true
        }
        // else{
        //     check=false
        //     console.log('false')
        // }
    })
    if(check===false){
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        })
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
    }else{
        console.log('error')
    }
}

export const getConversation = async (req,res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.id]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAllConversation = async (req,res) => {
    try {
        const conversation = await Conversation.find()
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Message Controller

export const postMessage = async (req,res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getMessage = async (req,res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error.message)
    }
}