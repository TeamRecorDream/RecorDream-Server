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

export default {
  createVoice,
};
