import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
} from "react-google-maps";
import "./test.css";

function decompress(encoded, precision) {
  precision = Math.pow(10, -precision);
  var len = encoded.length,
    index = 0,
    lat = 0,
    lng = 0,
    array = [];
  while (index < len) {
    var b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    array.push(lat * precision);
    array.push(lng * precision);
  }
  return array;
}

let coordinatesTmp;
let lines = [];
let coordinates = [];

function setLines() {
  for (let i = 0; i < data.length; i++) {
    coordinatesTmp = decompress(data[i].polyline.points, 5);
    coordinates = [];

    for (let j = 0; j < coordinatesTmp.length - 1; j = j + 2) {
      coordinates.push({
        lat: coordinatesTmp[j],
        lng: coordinatesTmp[j + 1],
      });
    }

    for (let j = 0; j < coordinates.length - 1; j++) {
      lines.push({ start: coordinates[j], end: coordinates[j + 1] });
    }
  }
}

const Test = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUCrM6-_YBzB7JbrzqagFukudNdcCsHZA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  setLines();
  console.log(lines);
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: 29.3985073, lng: -98.5258003 }}
    >
      {lines.map(function (line, k) {
        return (
          <div>
            <Marker position={{ lat: 29.3985073, lng: -98.5258003 }} />
            <Polyline
              options={{
                path: props.route,
                strokeColor: "#00ffff",
                strokeOpacity: 1,
                strokeWeight: 6,
                icons: [
                  {
                    offset: "0",
                    repeat: "10px",
                  },
                ],
              }}
              path={[
                { lat: line.start.lat, lng: line.start.lng },
                { lat: line.end.lat, lng: line.end.lng },
              ]}
            />
          </div>
        );
      })}
    </GoogleMap>
  );
});

const data = [
  {
    distance: {
      text: "52 ft",
      value: 16,
    },
    duration: {
      text: "1 min",
      value: 4,
    },
    end_location: {
      lat: 29.3985073,
      lng: -98.5258003,
    },
    html_instructions: "Head <b>east</b> toward <b>Roslyn Ave</b>",
    polyline: {
      points: "k{lrDdjjxQA?G]",
    },
    start_location: {
      lat: 29.3984637,
      lng: -98.525953,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "69 ft",
      value: 21,
    },
    duration: {
      text: "1 min",
      value: 6,
    },
    end_location: {
      lat: 29.398319,
      lng: -98.525784,
    },
    html_instructions: "Turn <b>right</b> toward <b>Roslyn Ave</b>",
    maneuver: "turn-right",
    polyline: {
      points: "u{lrDfijxQd@C",
    },
    start_location: {
      lat: 29.3985073,
      lng: -98.5258003,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "190 ft",
      value: 58,
    },
    duration: {
      text: "1 min",
      value: 17,
    },
    end_location: {
      lat: 29.3982696,
      lng: -98.5251869,
    },
    html_instructions: "Turn <b>left</b> toward <b>Roslyn Ave</b>",
    maneuver: "turn-left",
    polyline: {
      points: "ozlrDbijxQHuB",
    },
    start_location: {
      lat: 29.398319,
      lng: -98.525784,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "0.4 mi",
      value: 651,
    },
    duration: {
      text: "2 mins",
      value: 112,
    },
    end_location: {
      lat: 29.3976608,
      lng: -98.518507,
    },
    html_instructions: "Continue onto <b>Roslyn Ave</b>",
    polyline: {
      points: "ezlrDlejxQ@A?C?C?C@A\\cI^qJBi@DsAl@sN",
    },
    start_location: {
      lat: 29.3982696,
      lng: -98.5251869,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "315 ft",
      value: 96,
    },
    duration: {
      text: "1 min",
      value: 15,
    },
    end_location: {
      lat: 29.3968065,
      lng: -98.51861009999999,
    },
    html_instructions: "Turn <b>right</b> onto <b>Gaynor St</b>",
    maneuver: "turn-right",
    polyline: {
      points: "kvlrDt{hxQh@B~AJ^B",
    },
    start_location: {
      lat: 29.3976608,
      lng: -98.518507,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "236 ft",
      value: 72,
    },
    duration: {
      text: "1 min",
      value: 7,
    },
    end_location: {
      lat: 29.3968733,
      lng: -98.51935449999999,
    },
    html_instructions: "Turn <b>right</b> onto <b>Harriman Pl</b>",
    maneuver: "turn-right",
    polyline: {
      points: "aqlrDh|hxQKrC",
    },
    start_location: {
      lat: 29.3968065,
      lng: -98.51861009999999,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "3.8 mi",
      value: 6052,
    },
    duration: {
      text: "4 mins",
      value: 210,
    },
    end_location: {
      lat: 29.4071178,
      lng: -98.58011379999999,
    },
    html_instructions: "Take the ramp on the <b>left</b> onto <b>US-90 W</b>",
    maneuver: "ramp-left",
    polyline: {
      points:
        "mqlrD|`ixQB^?D?PAb@?F?|A@b@Ax@@h@Al@Ah@AXAh@Ch@EbACd@An@Cp@ATARA\\A\\@RFn@I|AEbAAJEp@C^ALEZANEVCTSxA_@pBOp@K`@U~@Ut@K\\GPGXM`@ABk@xBAB?@A??@A@?@A@CJADCDABAFIRAHEJcClIcClIADCJENADMb@GTCLCJWx@A@Uv@g@hBu@lCoAhECHs@`CQl@?@CFABKb@K\\k@nBuA`Fy@jDERa@rBA@g@nCO|@WbBUfBa@jDMxAIz@Er@KzAIlACl@C^E`AE`AK`BElAGzAGvA?LAB?@?DGfAEjAEZEvA?@I`BIjBC^MvCW|GQpCa@zIKfBEdAEf@ElAGjAGfAU|ESbECh@QfDABQdBAhBKhCShEYxFQpEY|Fa@~IUlFU|EEfAIdBCb@Cf@MdDGfAKvBCz@En@?HEp@Cl@G~AEv@MfCEjAGhAGjAEx@KxBUpF",
    },
    start_location: {
      lat: 29.3968733,
      lng: -98.51935449999999,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "3.8 mi",
      value: 6077,
    },
    duration: {
      text: "3 mins",
      value: 206,
    },
    end_location: {
      lat: 29.3993469,
      lng: -98.6417086,
    },
    html_instructions: "Keep <b>left</b> at the fork to stay on <b>US-90 W</b>",
    maneuver: "fork-left",
    polyline: {
      points:
        "oqnrDt|txQBT?DAF?NOxCE~@Ch@I~ACr@QrDALCn@KzBO`D?@?@KxBAf@Cj@Cv@AV?@EjA?B?@Cf@AX?L?@E~@?DAX?XA@?f@?FA`@Ah@?DCjA?R?RCp@?j@A|@AbC?^?L?vA?~@@lA@hB@dA?Z?r@@X@r@B`BF|CH~B@bA?DHdCDxBBt@NpGBv@B~A@L@h@@d@DrB@d@F|ARzEDp@PzCj@~GNdBR`BRtBb@|DV~BVrBP`BD\\D\\?FBNBTJ`AFl@VtBRjBFh@Dd@@LVxB@LDXRlBHr@TvBd@lEJp@J`AL`AHv@Ff@TxBf@tEFj@f@rEj@bF?BNxAR|ALdAPlBj@~ELhAJ~@XlCHr@L`AHt@VxBRhBJdAFl@@JBRD`@Ff@Fd@DZNpAHx@J|@Ff@\\|C^xCRxAXpBTpAZrBZjBHj@PbARpAl@tDPdAp@lEx@~Eh@dDTrAF`@^~Bd@xCHb@ZvB",
    },
    start_location: {
      lat: 29.4071178,
      lng: -98.58011379999999,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "0.1 mi",
      value: 226,
    },
    duration: {
      text: "1 min",
      value: 10,
    },
    end_location: {
      lat: 29.39902,
      lng: -98.6439935,
    },
    html_instructions: "Take the exit toward <b>I-410</b>/<wbr/><b>TX-16</b>",
    maneuver: "ramp-right",
    polyline: {
      points: "}`mrDt}`yQAV?LZlCLlAJhADb@D`@@L@N@B?B?B?BCF",
    },
    start_location: {
      lat: 29.3993469,
      lng: -98.6417086,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "0.2 mi",
      value: 293,
    },
    duration: {
      text: "1 min",
      value: 14,
    },
    end_location: {
      lat: 29.3982805,
      lng: -98.64689249999999,
    },
    html_instructions:
      "Merge onto <b>Cleto Rodriguez Fwy</b>/<wbr/><b>U.S. 90 Access Rd</b>",
    maneuver: "merge",
    polyline: {
      points: "{~lrD|kayQDX`@zBVdBJf@Fd@DTN~@Hb@V`BF\\",
    },
    start_location: {
      lat: 29.39902,
      lng: -98.6439935,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "0.9 mi",
      value: 1436,
    },
    duration: {
      text: "1 min",
      value: 69,
    },
    end_location: {
      lat: 29.3937189,
      lng: -98.660702,
    },
    html_instructions:
      'Keep <b>left</b> to stay on <b>Cleto Rodriguez Fwy</b>/<wbr/><b>U.S. 90 Access Rd</b><div style="font-size:0.9em">Continue to follow U.S. 90 Access Rd</div>',
    maneuver: "keep-left",
    polyline: {
      points:
        "gzlrD`~ayQDJBD@HBJR|@\\zAH\\Jf@@DFZBJHf@@BHj@@L@PHf@BPDT@HF\\@FF\\Hf@@HFZHf@Hf@Hb@DVFb@NvAJ~@BRFf@BN@VVdBDf@RbABHLl@\\nAd@tANd@Lb@`@hAPh@b@tANd@Nb@Nj@z@tCf@dBh@jBb@vAb@vANf@v@rCNd@?BNb@Lf@",
    },
    start_location: {
      lat: 29.3982805,
      lng: -98.64689249999999,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "0.1 mi",
      value: 171,
    },
    duration: {
      text: "1 min",
      value: 20,
    },
    end_location: {
      lat: 29.3949521,
      lng: -98.6609,
    },
    html_instructions:
      "Take the <b>Hunt Lane</b> exit toward <b>Ray Ellison Dr</b>",
    maneuver: "ramp-right",
    polyline: {
      points:
        "w}krDjtdyQGLEJ?@ABCDCBABCBCDC@CBGHOJUJE@C@GBE@C@E?C?C@A?C?C?A?C@A?CAE?C?C?CAA?A?CACACAAAEA?ACACACCECCECCCCCEIKGK",
    },
    start_location: {
      lat: 29.3937189,
      lng: -98.660702,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "1.6 mi",
      value: 2653,
    },
    duration: {
      text: "3 mins",
      value: 189,
    },
    end_location: {
      lat: 29.4177059,
      lng: -98.66312839999999,
    },
    html_instructions:
      "Turn <b>left</b> onto <b>Hunt Ln</b> (signs for <b>Hunt Lane</b>/<wbr/><b>Ray Ellison Dr</b>)",
    maneuver: "turn-left",
    polyline: {
      points:
        "melrDrudyQq@q@KLKP[f@MRWb@cBvC}@~AUVYXUPMJIFa@TQHKDc@LKB]HkBFcADgAB_BD}@GkBKeDW_@Ce@CWAKAM?o@?iD?gA?_B?kB?kB?oC@uE?yC?oC?oB@kC?iA?W?]?Q?s@?w@AsB?yBAkB?c@@c@?sD?c@?gB?uB@gCCO@c@AK?K?U@mA?aBAiA?K?YA_@?g@?",
    },
    start_location: {
      lat: 29.3949521,
      lng: -98.6609,
    },
    travel_mode: "DRIVING",
  },
  {
    distance: {
      text: "1.1 mi",
      value: 1716,
    },
    duration: {
      text: "2 mins",
      value: 148,
    },
    end_location: {
      lat: 29.4178625,
      lng: -98.6805432,
    },
    html_instructions: "Turn <b>left</b> onto <b>Marbach Rd</b>",
    maneuver: "turn-left",
    polyline: {
      points:
        "usprDpceyQ_@Q?X?fC?J?X@zD?zD?lA?bA?tC?N?jE?j@@X@~A?xA?`@?zA@zA?R?pA?nD?lF?fA@^?LAJ?zB?dA?H?@?`A@lD?R?jA?b@?B?p@Ab@?\\?V?FAL?z@A\\?v@?x@?L?|@ApC?tB",
    },
    start_location: {
      lat: 29.4177059,
      lng: -98.66312839999999,
    },
    travel_mode: "DRIVING",
  },
];

export default Test;
