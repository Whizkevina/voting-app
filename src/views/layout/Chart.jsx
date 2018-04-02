import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'

const getColors = (length, inc=10, s, l) => {
  const h = Math.floor(Math.random() * 360)
  return Array(length).fill(0).map((v,i) => (
    `hsl(${(h+(inc*i)) % 360}, ${s}%, ${l}%)`
  ))
}

const Chart = ({ className, choices, width=300, height=200 }) => {

  return (
    <div className={className}>
      <Doughnut
        data={{
          datasets: [{
            data: choices.map(choice => choice.votes),
            backgroundColor: getColors(choices.length, 360/2/choices.length, 60, 50)
          }],
          labels: choices.map(choice => choice.choice)
        }}
        options={{
          legend: {
            position: 'bottom',
            padding: 10
          },
          layout: {
            padding: {
              top: 40
            }
          },
          responsive: true
        }}
      />
    </div>
  )
}

export default Chart