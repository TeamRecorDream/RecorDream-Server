import Voice from "../models/Voice";
import { VoiceResponseDto } from "../interfaces/voice/VoiceResponseDto";
import { VoiceUploadDto } from "../interfaces/voice/VoiceUploadDto";

const createVoice = async (voiceUploadDto: VoiceUploadDto): Promise<VoiceResponseDto | null> => {
  try {
    const voice = new Voice(voiceUploadDto);
    await voice.save();

    const data = {
      _id: voice._id,
      recorder: voice.recorder,
      url: voice.url,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateVoice = async (userId: string, voiceId: string, voiceUploadDto: VoiceUploadDto): Promise<VoiceResponseDto | null> => {
  try {
    const voice = await Voice.findById(voiceId);
    if (!voice || !voiceUploadDto) return null;

    const update = await Voice.findOneAndUpdate(
      { _id: voiceId, recorder: userId }, //filter
      {
        $set: voiceUploadDto, //수정 사항
      },
      { new: true } //업데이트 후 도큐먼트 반환
    );

    if (!update) return null;

    const data = {
      _id: update._id,
      recorder: userId,
      url: update.url,
    };
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getVoice = async (userId: string, voiceId: string): Promise<VoiceResponseDto | null> => {
  try {
    const voice = await Voice.findById(voiceId).where("recorder").equals(userId); //레퍼라
    if (!voice) return null;

    const data = {
      _id: voice._id,
      recorder: voice.recorder,
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
