import Voice from "../models/Voice";
import { VoiceResponseDto } from "../interfaces/voice/VoiceResponseDto";
import { VoiceUploadDto } from "../interfaces/voice/VoiceUploadDto";

const createVoice = async (voiceUploadDto: VoiceUploadDto): Promise<VoiceResponseDto | null> => {
  try {
    const voice = new Voice(voiceUploadDto);
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

const updateVoice = async (voiceId: string, voiceUploadDto: VoiceUploadDto): Promise<VoiceResponseDto | null> => {
  try {
    const voice = await Voice.findById(voiceId); //레퍼라
    if (!voice) return null;

    const data = await Voice.findOneAndUpdate(
      { _id: voiceId }, //filter
      {
        $set: { voiceUploadDto }, //수정 사항
      },
      { new: true } //업데이트 후 도큐먼트 반환
    );

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
  updateVoice,
  getVoice,
};
