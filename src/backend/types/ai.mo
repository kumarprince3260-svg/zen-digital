import Types "../types/common";

module {
  public type Message = Types.Message;

  /// Request payload for the AI backend
  public type AIRequest = {
    messages : [Message];
  };

  /// Response from the AI backend
  public type AIResponse = Text;
};
