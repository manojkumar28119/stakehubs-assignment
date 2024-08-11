# Stakehubs Order Matching System

## Overview

The Stakehubs Order Matching System is a full-stack application designed to manage buyer and seller orders in a manner similar to stock exchanges. The system supports order creation, matching, and completion, with data stored in SQLite and a React-based frontend for user interaction.

## Features

- **Order Placement**: Users can place buy or sell orders specifying price and quantity.
- **Order Matching**: Orders are matched when a buyer's price is equal to or higher than a seller's price. The matched orders are moved to the Completed Orders table.
- **Real-Time Data Handling**: The frontend updates order tables and price charts in real-time as new orders are matched and completed.
- **Responsive UI**: The user interface is designed to be accessible and responsive across various devices.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Charting Library**: Recharts (for dynamic price chart)
- **Deployment**: Backend deployed on Render, Frontend deployed on Netlify

## Installation

### Prerequisites

- Node.js
- SQLite3

### Clone the Repository

```bash
git clone https://github.com/manojkumar28119/stakehubs-assignment.git
cd stakehubs-order-matching-system


## Deployed Link :
https://stock-exchange-by-mk.netlify.app/
