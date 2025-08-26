import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CreditExposureChart = () => {
  // Add styles directly in the component
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #f9fafb;
      color: #1f2937;
      line-height: 1.5;
    }

    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header {
      text-align: center;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #6b7280;
    }

    .chart-container {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .legend-panel, .insights-panel {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .panel-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .legend-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .legend-item {
      padding: 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      transition: background-color 0.2s;
    }

    .legend-item:hover {
      background-color: #f9fafb;
    }

    .legend-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .legend-info {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      margin-right: 12px;
    }

    .legend-name {
      font-weight: 500;
      font-size: 14px;
    }

    .legend-value {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
    }

    .legend-dates {
      margin-left: 28px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .legend-date {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6b7280;
    }

    .insights-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .insight-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 14px;
      color: #6b7280;
    }

    .insight-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .insight-dot.blue { background-color: #3b82f6; }
    .insight-dot.red { background-color: #ef4444; }
    .insight-dot.green { background-color: #10b981; }
    .insight-dot.yellow { background-color: #f59e0b; }

    .info-panel {
      background: #dbeafe;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #93c5fd;
    }

    .info-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 8px;
    }

    .info-text {
      color: #1e40af;
      font-size: 14px;
      line-height: 1.6;
    }

    .tooltip {
      background: white;
      padding: 12px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 300px;
    }

    .tooltip-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .tooltip-total {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .tooltip-bookings {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tooltip-booking {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tooltip-booking-info {
      display: flex;
      align-items: center;
    }

    .tooltip-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      margin-right: 8px;
    }

    .tooltip-booking-name {
      font-size: 14px;
      color: #6b7280;
    }

    .tooltip-booking-value {
      font-size: 14px;
      font-weight: 500;
    }

    .tooltip-warning {
      color: #dc2626;
      font-weight: 600;
      margin-top: 8px;
    }
  `;

  // Inject styles into the document head
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  // Sample data representing different bookings
  const bookings = [
    {
      id: 1,
      name: "Business Trip NYC",
      value: 2500,
      checkinDate: new Date(2025, 6, 28), // July 28, 2025
      checkoutDate: new Date(2025, 7, 3), // August 3, 2025
      paymentDate: new Date(2025, 8, 3), // September 3, 2025
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Conference Chicago",
      value: 1800,
      checkinDate: new Date(2025, 7, 5), // August 5, 2025
      checkoutDate: new Date(2025, 7, 8), // August 8, 2025
      paymentDate: new Date(2025, 8, 3), // September 3, 2025
      color: "#EF4444",
    },
    {
      id: 3,
      name: "Training Seattle",
      value: 3200,
      checkinDate: new Date(2025, 7, 15), // August 15, 2025
      checkoutDate: new Date(2025, 7, 18), // August 18, 2025
      paymentDate: new Date(2025, 9, 3), // October 3, 2025
      color: "#10B981",
    },
    {
      id: 4,
      name: "Client Meeting LA",
      value: 1500,
      checkinDate: new Date(2025, 8, 10), // September 10, 2025
      checkoutDate: new Date(2025, 8, 12), // September 12, 2025
      paymentDate: new Date(2025, 9, 3), // October 3, 2025
      color: "#F59E0B",
    },
    {
      id: 5,
      name: "Team Retreat Miami",
      value: 4000,
      checkinDate: new Date(2025, 8, 25), // September 25, 2025
      checkoutDate: new Date(2025, 8, 28), // September 28, 2025
      paymentDate: new Date(2025, 10, 3), // November 3, 2025
      color: "#8B5CF6",
    },
  ];

  const creditLimit = 12000;
  const startDate = new Date(2025, 6, 25); // July 25, 2025
  const endDate = new Date(2025, 10, 15); // November 15, 2025

  // Generate daily data
  const chartData = useMemo(() => {
    const data = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dayData = {
        date: new Date(current),
        dateStr: current.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        totalExposure: 0,
      };

      // Calculate exposure for each booking on this day
      bookings.forEach((booking) => {
        const exposureStart = booking.checkinDate;
        const exposureEnd = new Date(booking.paymentDate);
        exposureEnd.setDate(exposureEnd.getDate() - 1); // Day before payment

        if (current >= exposureStart && current <= exposureEnd) {
          dayData[`booking_${booking.id}`] = booking.value;
          dayData.totalExposure += booking.value;
        } else {
          dayData[`booking_${booking.id}`] = 0;
        }
      });

      data.push(dayData);
      current.setDate(current.getDate() + 1);
    }

    return data;
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const totalExposure = payload.reduce(
        (sum, entry) => sum + entry.value,
        0
      );
      const activeBookings = payload.filter((entry) => entry.value > 0);

      return (
        <div className="tooltip">
          <p className="tooltip-title">{label}</p>
          <p className="tooltip-total">
            Total Exposure: {formatCurrency(totalExposure)}
          </p>
          {activeBookings.length > 0 && (
            <div className="tooltip-bookings">
              {activeBookings.map((entry, index) => {
                const booking = bookings.find(
                  (b) => `booking_${b.id}` === entry.dataKey
                );
                return (
                  <div key={index} className="tooltip-booking">
                    <div className="tooltip-booking-info">
                      <div
                        className="tooltip-color-dot"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="tooltip-booking-name">
                        {booking?.name}
                      </span>
                    </div>
                    <span className="tooltip-booking-value">
                      {formatCurrency(entry.value)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {totalExposure > creditLimit && (
            <p className="tooltip-warning">⚠️ Exceeds Credit Limit!</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2 className="title">Daily Credit Exposure Visualization</h2>
        <p className="subtitle">
          Corporate Client X - Credit Limit: {formatCurrency(creditLimit)}
        </p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="dateStr"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />

            {/* Stacked areas for each booking */}
            {bookings.map((booking) => (
              <Area
                key={booking.id}
                type="monotone"
                dataKey={`booking_${booking.id}`}
                stackId="1"
                stroke={booking.color}
                fill={booking.color}
                fillOpacity={0.8}
                strokeWidth={1}
              />
            ))}

            {/* Credit limit line */}
            <ReferenceLine
              y={creditLimit}
              stroke="#dc2626"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{
                value: `Credit Limit: ${formatCurrency(creditLimit)}`,
                position: "topRight",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="content-grid">
        <div className="legend-panel">
          <h3 className="panel-title">Booking Legend</h3>
          <div className="legend-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="legend-item">
                <div className="legend-header">
                  <div className="legend-info">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: booking.color }}
                    />
                    <span className="legend-name">{booking.name}</span>
                  </div>
                  <span className="legend-value">
                    {formatCurrency(booking.value)}
                  </span>
                </div>
                <div className="legend-dates">
                  <div className="legend-date">
                    <span>Check-in:</span>
                    <span>
                      {booking.checkinDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="legend-date">
                    <span>Check-out:</span>
                    <span>
                      {booking.checkoutDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="legend-date">
                    <span>Payment:</span>
                    <span>
                      {booking.paymentDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="insights-panel">
          <h3 className="panel-title">Key Insights</h3>
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-dot blue"></div>
              <span>
                Each colored area represents a booking's impact on credit
                exposure
              </span>
            </div>
            <div className="insight-item">
              <div className="insight-dot red"></div>
              <span>The red dashed line shows your credit limit</span>
            </div>
            <div className="insight-item">
              <div className="insight-dot green"></div>
              <span>
                Exposure starts at check-in and ends the day before payment
              </span>
            </div>
            <div className="insight-item">
              <div className="insight-dot yellow"></div>
              <span>Hover over any point to see detailed breakdown</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-panel">
        <h3 className="info-title">How It Works</h3>
        <p className="info-text">
          This visualization shows your daily credit exposure over time. Each
          booking contributes to your total exposure from its check-in date
          until the day before payment is processed. The system runs a 365-day
          simulation to ensure no single day exceeds your credit limit before
          approving new bookings.
        </p>
      </div>
    </div>
  );
};

export default CreditExposureChart;
