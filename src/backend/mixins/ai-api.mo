import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/ai";

mixin (transform : OutCall.Transform) {
  /// Send a list of chat messages to ZEN AI and receive the assistant reply.
  public func sendAIMessage(messages : [Types.Message]) : async Text {
    Debug.todo();
  };
};
