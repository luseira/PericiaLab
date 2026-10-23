# Scorpio settings JSON: output/bus source codes (from 4.json test, fw 11.01.5825)

AnalogOutputs.<OUT> = { source, chan, userName, dB10thsGain, msDelay, lineMic, muted, autoMute, autoMutOptions, isAes, linkedToOutput }

| Front panel           | source           | chan            | status            |
|-----------------------|------------------|-----------------|-------------------|
| ISO n pre             | PreFaderIso      | n (1-32)        | confirmed (X1=17) |
| ISO n post            | PostFaderIso     | n               | confirmed (X2=18) |
| Bus 3                 | MixBusPostLim    | 9               | confirmed         |
| Bus n (1-10)          | MixBusPostLim    | n+6             | inferred (orig. X1 "BUS 1 TX"=7) |
| HP-L                  | MixBusPostLim    | 1               | confirmed         |
| HP-R                  | MixBusPostLim    | 2               | inferred          |
| Bus L / R             | MixBusPostLim    | 5 / 6           | inferred (H1L/H1R defaults) |
| Return B1             | StereoReturn     | 3               | confirmed         |
| Return A1,A2,B1,B2,C1,C2 | StereoReturn  | 1..6            | inferred          |
| Com Rtn 1             | Comms            | 3               | confirmed         |
| Com Rtn 2             | Comms            | 4               | inferred          |
| (off)                 | Silence          | 1               | confirmed         |

lineMic: LinePlus4dBu, LineMinus10dBV (others: Mic, AES — to confirm)
linkedToOutput: "nAnalogOutputs" = unlinked; else name of the pair leader (X7/X8 -> "X7").

Bus send per channel: InputChannelN.busK = { routeState: Prefader|Postfader|PostSend|Unrouted, dB10thsSendGain }
Bus names: OutputBusControl.obusK.userName
Bus input sources: SlateMicAndReturns.busK = "" | "_1" (Com Rtn 1, inferred) | "Bl" (Return B L) ...
DanteOutputs.DanteN / AESOutputs.AESN use the same {source, chan}.
