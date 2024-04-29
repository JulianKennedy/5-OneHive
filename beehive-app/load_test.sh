#!/bin/bash

# Start time in seconds with nanoseconds
start_time=$(date +%s.%N)

# Make 50 requests in parallel using curl
for ((i=1; i<=50; i++))
do
    curl -s -o /dev/null http://example.com &
done

# Wait for all background processes to finish
wait

# End time in seconds with nanoseconds
end_time=$(date +%s.%N)

# Calculate total time in seconds with nanoseconds
total_time=$(echo "$end_time - $start_time" | awk '{printf "%.3f", $1}')
echo "Total time taken: $total_time seconds"
