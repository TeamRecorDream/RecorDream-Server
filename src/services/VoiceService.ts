import Voice from '../models/Voice';
import { VoiceResponseDto } from '../interfaces/voice/VoiceResponseDto';
import voiceMocking from '../models/VoiceMocking';
import mongoose from 'mongoose';
import { VoiceInfo } from '../interfaces/voice/VoiceInfo';

const createVoice = async (): Promise<VoiceResponseDto | null> => {
  try {
    const voiceObjectId: mongoose.Types.ObjectId = voiceMocking[0];
    const voice = await Voice.findById(voiceObjectId);

    if (!voice) return null;
    const data = {
      _id: voice._id,
      url: voice.url,
    };
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getVoice = async (voiceId: string): Promise<VoiceResponseDto | null> => {
  try {
    const voice = await Voice.findById(voiceId); //레퍼라
    if (!voice) return null;

    const data = {
      _id: voice._id,
      url: voice.url,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createVoice,
  getVoice,
};
