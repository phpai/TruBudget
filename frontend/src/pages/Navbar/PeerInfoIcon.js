// import React, { Component } from "react";
// import IconButton from "material-ui/IconButton";
// import Menu, { MenuItem } from "material-ui/Menu";
// import Badge from "material-ui/Badge";
// import IconMenu from "material-ui/IconMenu";
// import Subheader from "material-ui/Subheader";
// import NetworkIcon from "@material-ui/icons/DeviceHub";

// import colors from "../../colors";
// import strings from "../../localizeStrings";

// class Icon extends Component {
//   render() {
//     return (
//       <IconButton {...this.props} tooltip={strings.navigation.peers}>
//         <NetworkIcon color={colors.lightColor} />
//       </IconButton>
//     );
//   }
// }

// const transformPeers = (peers = []) => {
//   const amount = peers.size || 0;
//   const list = peers.map((peer, index) => {
//     const addr = peer.getIn(["addr"]);
//     return <MenuItem key={index} primaryText={addr} />;
//   });
//   return { amount, list };
// };
// const PeerInfoIcon = props => {
//   const { amount, list } = transformPeers(props.peers);
//   return (
//     <Badge badgeContent={amount} secondary={true} style={{ padding: 0 }} badgeStyle={{ height: "18px", width: "18px" }}>
//       <Menu
//         iconButtonElement={<Icon />}
//         anchorOrigin={{ horizontal: "left", vertical: "top" }}
//         targetOrigin={{ horizontal: "right", vertical: "top" }}
//       >
//         <Subheader>{strings.navigation.connected_peers}</Subheader>
//         {amount > 0 ? list : <MenuItem primaryText={strings.navigation.no_peers} disabled />}
//       </Menu>
//     </Badge>
//   );
// };

// TODO: convert to material ui v1
export default null;
