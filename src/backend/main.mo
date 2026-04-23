import OutCall "mo:caffeineai-http-outcalls/outcall";
import AIMixin "mixins/ai-api";

actor {
  /// Transform callback required by the IC HTTP outcall system.
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  include AIMixin(transform);
};
