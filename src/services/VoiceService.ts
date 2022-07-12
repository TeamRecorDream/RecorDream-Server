import Voice from '../models/Voice';
import { VoiceResponseDto } from '../interfaces/voice/VoiceResponseDto';

const createVoice = async (link: string, fileName: string): Promise<VoiceResponseDto> => {
  try {
    const voice = new Voice({
      link,
      fileName,
    });
    await voice.save();
    const data = {
      _id: voice._id,
      link,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getVoice = async (voiceId: string): Promise<VoiceResponseDto | null> => {
  try {
    const voice = await Voice.findById(voiceId); //레퍼라
    if (!voice) return null;

    const data = {
      _id: voice._id,
      link: voice.link,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createVoice,
  getVoice,
};
