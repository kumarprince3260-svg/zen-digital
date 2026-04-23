import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/ai";

module {
  /// Build the JSON body for the Anthropic API request
  public func buildRequestBody(messages : [Types.Message]) : Text {
    Debug.todo();
  };

  /// Parse the assistant reply text from the Anthropic API JSON response
  public func parseReply(json : Text) : Text {
    Debug.todo();
  };

  /// Call the Anthropic Claude API and return the assistant reply text
  public func callAnthropic(
    messages : [Types.Message],
    transform : OutCall.Transform,
  ) : async Text {
    Debug.todo();
  };
};
