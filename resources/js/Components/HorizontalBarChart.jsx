import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

function Bar({count, level, max}) {
  const barWidth = Math.max(5, (count / max) * 100);
  const labels = {
    '0': '0 - 20',
    '1': '21 - 40',
    '2': '41 - 60',
    '3': '61 - 80',
    '4': '81 - 100',
    '5': '101 - 120'
  }

  const label = labels[level] ?? '121+';

  return (
    <Grid mb={3} height={5} borderRadius={2.5} position='relative' templateColumns={'85px 1fr 25px'} alignItems='center'>
      <GridItem>{label}</GridItem>
      <GridItem className='bar-wrapper' height={'100%'} p='3px 0'>
        <Box height={'100%'} position='relative' bg='blue.500' width={`${barWidth}%`}>
          <Box position={'absolute'} top='50%' right={{base: '2px', md: '5px'}} fontSize={{ base: 'xs', md: 'initial' }} transform='translateY(-50%)' fontWeight={'bold'} color='white'>{count}</Box>
        </Box>
      </GridItem>
    </Grid>
  );
}

function HorizontalBarChart({data}) {
    const max = Object.values(data).reduce((t, i) => Math.max(t, i), 0);
    const maxLevel = Object.keys(data).reduce((t, i) => Math.max(t, i), -1);
    const chartEntries = {};
    for(let i=0; i<=maxLevel; i++) {
        chartEntries[i] = data[i] ?? 0;
    }

    return (
        <div className="chart mb-3">
            {Object.keys(chartEntries).length > 0 ?
                (
                    <>
                        {Object.entries(chartEntries).map(([level, count], index) => {
                            return (
                                <Bar key={index} count={count} level={level} max={max} />
                            )}
                        )}
                        <div className="y-axis-label fw-bold">Rounds</div>
                    </>
                ) :
                <table className='table table-info'><tbody><tr><th>No Data</th></tr></tbody></table>
            }
        </div>
    );
}

export default HorizontalBarChart;