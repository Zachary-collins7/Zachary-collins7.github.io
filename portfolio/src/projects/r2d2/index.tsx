import * as React from 'react';
import "./index.scss";

export interface Ir2d2Props {
}

export default function r2d2 (props: Ir2d2Props) {
  return (
      <div className="main d-flex flex-col">
          <div className="head">
              <div className="top"></div>
              <div className="forhead d-flex">
                  <div className="grow-1 bg-primary"></div>
                  <div className="grow-1 bg-primary"></div>
              </div>
              <div className="eye">
                  <div className="iris"></div>
              </div>
              <div className="chin d-flex grow-1">
                  <div className="d-flex grow-1">
                      <div className="grow-2 bg-primary"></div>
                      <div className="grow-1 bg-primary mx-0"></div>
                      <div className="grow-1 bg-primary"></div>
                  </div>
                  <div className="d-flex grow-1">
                      <div className="redeye"></div>
                  </div>
                  <div className="d-flex grow-1">
                      <div className="minieye grow-2">
                          <div className="iris"></div>
                      </div>
                      <div className="grow-1 bg-primary mx-0"></div>
                      <div className="grow-1 bg-primary"></div>
                  </div>
              </div>
          </div>
          <div className="body">
              <div className="details">
                  <div className="left flex-col">
                      <div className="panel"></div>
                  </div>
                  <div className="center d-flex flex-col">
                      <div className="bar"></div>
                      <div className="arms d-flex flex-col grow-1">
                          <div className="arm"></div>
                          <div className="arm"></div>
                      </div>
                      <div className="console d-flex">
                          <div className="grow-1 d-flex flex-col">
                              <div className="panel grow-1"></div>
                              <div className="d-flex flex-col grow-2 bars">
                                  <div className="bg-primary grow-1"></div>
                                  <div className="grow-1"></div>
                                  <div className="bg-primary grow-1"></div>
                                  <div className="grow-1"></div>
                                  <div className="bg-primary grow-1"></div>
                                  <div className="grow-1"></div>
                                  <div className="bg-primary grow-1"></div>
                                  <div className="grow-1"></div>
                                  <div className="bg-primary grow-1"></div>
                              </div>
                          </div>
                          <div className="grow-1 d-flex flex-col">
                              <div className="center-panel grow-2"></div>
                          </div>
                          <div className="panel"></div>
                      </div>
                      <div className="knobs d-flex minipanels">
                          <div className="panel"></div>
                          <div className="panel"></div>
                          <div className="panel"></div>
                      </div>
                      <div className="knobs d-flex">
                          <div className="panel"></div>
                          <div className="crossKnob">
                              <div className="dot"></div>
                          </div>
                          <div className="panel"></div>
                      </div>
                  </div>
                  <div className="right flex-col">
                      <div className="panel"></div>
                  </div>
              </div>
              <div className="left-leg">
                  <div className="left-foot">

                  </div>
              </div>

              <div className="center-leg">
                  <div className="center-foot">

                  </div>
              </div>

              <div className="right-leg">
                  <div className="right-foot">

                  </div>
              </div>
          </div>
      </div>
  );
}
