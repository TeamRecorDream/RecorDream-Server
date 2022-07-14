import Voice from '../models/Voice';
import { VoiceResponseDto } from '../interfaces/voice/VoiceResponseDto';

const createVoice = async (url: string, fileName: string): Promise<VoiceResponseDto> => {
  try {
    const voice = new Voice({
      url,
      fileName,
    });
    await voice.save();
    const data = {
      _id: voice._id,
      url,
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
