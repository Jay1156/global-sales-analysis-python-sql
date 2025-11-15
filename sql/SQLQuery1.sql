SELECT * FROM dbo.sales_data 
USE sales_project;
GO
SELECT 
  (SELECT COUNT(*) FROM dbo.sales_data_sample) AS RawRows,
  (SELECT COUNT(*) FROM dbo.sales_data) AS CleanRows;
GO

--Revenue
SELECT SUM(SALES) AS total_revenue
FROM sales_data;

--Top 5 countries
SELECT COUNTRY, SUM(SALES) AS revenue
FROM sales_data
GROUP BY COUNTRY
ORDER BY revenue DESC
LIMIT 5;

--Top Products
SELECT PRODUCTLINE, SUM(SALES) AS revenue
FROM sales_data
GROUP BY PRODUCTLINE
ORDER BY revenue DESC;

--Monthly trend
SELECT 
    FORMAT(ORDERDATE, 'yyyy-MM') AS month,
    SUM(SALES) AS total_sales
FROM sales_data
GROUP BY FORMAT(ORDERDATE, 'yyyy-MM')
ORDER BY month;
