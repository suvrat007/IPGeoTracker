import Spline from "@splinetool/react-spline";

const Earth = ()=> {
    return (
            <div className="inset-0 w-full h-full flex justify-center items-center">{/* Background Spline */}
                <div className="right-0 w-full h-full md:w-[100%] md:h-[90%] lg:w-[95%] lg:h-[100%] ">
                    <Spline scene="https://prod.spline.design/xppCBxhIhqTjTGX7/scene.splinecode"/>
                    {/*<Spline scene="https://prod.spline.design/cUhdOzs9Q93Y2UJz/scene.splinecode" />*/}
                </div>
            </div>
    )
}
export default Earth