import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import DataChart from './data-chart';

const Analytics = () => (
  <DataChart />
);

export default Analytics;

// Material:
// <Card>
//   <CardHeader
//     title="DATAVISUAL EXAMPLES:"
//   />
//   <CardMedia
//     overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
//   >
//     <DataChart />
//   </CardMedia>
//   <CardActions>
//     <FlatButton label="Action1" />
//     <FlatButton label="Action2" />
//   </CardActions>
// </Card>
