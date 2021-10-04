/**
 * Priority: Time complexity
 * if memory complexity is not an issue, 
 * maybe two different allocations of storage?
 * 
 * options:
 *  storing in Linked List
 *      pros: reorganization and ease of top100() function
 *      cons: 0(n) for search so updating frequency would be hard
 *  arr of arr, [[ip1,6][ip2,6]]
 *      pros:  bubble sorting an array of arrays would work
 *      cons : but be slow 0(n)
 *  object for freq, heapsort into arr of arr for top100
 *      pros: Faster, the ones that are called the least take the least time vice versa
 *      cons: Memory complexity, not easy to update heap values
 * 
 */


class IPTracker {
    constructor(){
       this.counter = new Object()
       this.sortedIPs = new Heap()
    }
    // runs during request, begins the sort functions, adds one to counter
    static requestHandled(ipAddress){
        addToSorted(ipAddress)
        this.counter[ipAddress] ?
            this.counter[ipAddress] ++
            :this.counter[ipAddress] = 1
        return
    }
    static addToSorted(ipAddress){
        if (!this.counter[ipAddress]) return this.sortedIPs.push([1,ipAddress])
        for (let i=0; i<this.sortedIPs.length; i++){
            if (this.sortedIPs[i][1]===ipAddress){
                this.sortedIPs[i][0]++
                bubbleUp(i)
                break
            }
        }
    }
    bubbleUp = (index) => {
        let current
        if (this.sortedIPs[index-1][0]< this.sortedIPs[index][0]){
            current = this.sortedIPs.splice(index,1)[0]
        }
        if (current){
            //go down from index-2 (already compared to index-1)
            for(let i=index-2; i>=0; i--){
                if (this.sortedIPs[i][0]>current[0]){
                    this.sortedIPs.splice(i,0,current)
                    break
                }
            }
        }
        return this.sortedIPs
    }
    top100 = () => {
       return this.sortedIPs.length>100? this.sortedIPs.slice(0,100) : this.sortedIPs
    }

    // O(n), eliminates the garbage collection slowdown of nodejs, 
    // could also just set this.counter = new Object() for faster, more clutter
    clear = () => {
        for(let key in this.counter){
            delete this.counter[key]
        }
        return this.counter
    }
}
