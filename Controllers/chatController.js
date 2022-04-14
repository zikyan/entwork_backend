import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// Conversation Controller

export const postConversation = async (req,res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error.message)
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