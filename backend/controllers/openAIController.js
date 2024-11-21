import asyncHandler from "express-async-handler";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ContentHistory from "../models/ContentHistory.js";
import User from "../models/User.js";

// ! -------------------
//! @desc GeminiAI Controller

const GeminiAIController = asyncHandler(async (req, res) => {
  try {
    const request = req.body;
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(process.env.Gemini_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(request.prompt);
    console.log(req.user?._id);

    const result = await model.generateContent(request.prompt, {
      // maxTokens: 100,
      temperature: 0.7,
      topP: 1,
      topK: 1,
      stopSequences: ["\n\n"],
      numResults: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      logitBias: {},
      logProbs: 0,
    });
    // console.log(result.response.text());
    //? Create the History

    const history = await ContentHistory.create({
      user: req.user.id,
      content: result.response.text(),
    });

    //? Push the history to the user

    const userFound = await User.findById(req.user._id);
    userFound.history.push(history._id);
    await userFound.save();
 
    res.status(200).json({
      status: "success",
      message: "Content generated successfully",
      data: result.response.text(),
      history,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export default GeminiAIController;
